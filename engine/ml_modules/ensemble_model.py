import numpy as np
import engine.ml_modules.modules.user_tests as user_tests
import engine.ml_modules.modules.utils as utils_functions
from engine.ml_modules.modules.memory_based import memory_based_collaborative_filtering
from engine.ml_modules.modules.model_based import model_based_collaborative_filtering
import warnings
from datetime import datetime

# todo : when added to db, modulate the probabilities of properties with the number of questions asked in each category
# todo : when added to db, modulate the probabilities of propositions with the number of questions asked in each category
# todo : change. module the probabilities of propositions with the expectancy of reward, (1./N_time_seen) * beneficial
# todo : replace softmax with translation

class ensemble_model():
    '''
    Ensemble model between the memory based collaborative filtering model and the model based collaborative filtering one.
    When the number of users is small, only the memory based collaborative filter will be used. The model based collaborative 
    filter needs data to learn parameters which are learned offline.
    Relative weighting between the multiple memory based and the multiple model based collaborative filters should be learned two.
    '''

    def __init__(self, data, type_, **kwargs):
        self.data        = data
        self.beta        = 2                                   # softmax parameter                   
        self.possible_types_  = ['memory_based', 'model_based', 'ensemble']
        assert(type_ in self.possible_types_), 'type must be in {0}'.format(self.possible_types_)
        self.type_            = type_
        if self.type_ != 'memory_based': self.type_ = 'memory_based'; warnings.warn('Model based not implemented yet, \
                                                                                                falling back on memory model')
        if self.type_ == 'memory_based' or self.type_ == 'ensemble': 
            if 'memory_based' not in kwargs.keys() : kwargs['memory_based'] = 'pulled'; kwargs['weights_mem'] = np.array([0.5, 0.5])
        if self.type_ == 'model_based' or self.type_ == 'ensemble': 
            if 'model_based' not in kwargs.keys() : kwargs['memory_based'] = 'pulled'; kwargs['weights_mod'] = np.array([0.5, 0.5])
        if data.label == 'propositions':
            if 'myuser_dates' in kwargs.keys():
                self.myuser_dates   = kwargs['myuser_dates']
            else:
                assert(False), 'The last time the user interacted with each recommendation must be precised, put -inf for all non encountered ones'            
            self.gamma              = 0.85                                # discard rate when skipping has occured
            self.skip_time          = 30                                  # maximum number of days where skipping event impacts               
            self.time_from_skip     = np.array([(datetime.utcnow() - self.myuser_dates)[i].days + 1 for i in range(len(self.myuser_dates))])        
            self.penalize_skipped   = self.skip_time - (np.minimum(self.skip_time + 1, self.time_from_skip) - 1)
            if 'freq_recomm' in kwargs.keys():
                self.freq_recomm    = kwargs['freq_recomm'] + 1
            else:
                self.freq_recomm    = np.ones(self.data.nb_pptions)
                warnings.warn('Frequency of recommendations were not given; falling back on uniform frequencies')
            if 'recomm_impact' in kwargs.keys():
                self.recomm_impact    = kwargs['recomm_impact']
            else:
                self.recomm_impact    = np.ones(self.data.nb_pptions)
                warnings.warn('Impact of recommendations were not given; falling back on uniform impacts')
        self.kwargs             = kwargs
        

        if self.type_ == 'memory_based':
            self.memoryBased_collFilter = memory_based_collaborative_filtering(data, kwargs['memory_based'])
            if kwargs['memory_based'] == 'pulled' : assert(sum(kwargs['weights_mem']) == 1), 'ensemble model does not sum to 1'
        elif self.type_ == 'model_based':
            self.modelBased_collFilter  = model_based_collaborative_filtering(data, kwargs['model_based'])
            if kwargs['model_based'] == 'pulled' : assert(sum(kwargs['weights_mod']) == 1), 'ensemble model does not sum to 1'
        else:
            self.memoryBased_collFilter = memory_based_collaborative_filtering(data, kwargs['memory_based'])
            self.modelBased_collFilter  = model_based_collaborative_filtering(data, kwargs['model_based'])
            assert(kwargs['memory_based'] == 'pulled' and kwargs['model_based'] == 'pulled'), 'for ensemble case, only pulled cases are considered'
            assert(sum(kwargs['weights_mod']) + sum(kwargs['weights_mem']) == 1), 'ensemble model does not sum to 1'

    def _sample(self):
        if self.type_ == 'memory_based' or self.type_ == 'ensemble': 
            if self.kwargs['memory_based'] == 'pulled': self.memoryBased_collFilter.get_predictions(self.kwargs['weights_mem'])
            else: self.memoryBased_collFilter.get_predictions()
            predictions = self.memoryBased_collFilter.predictions
        elif self.type_ == 'model_based' or self.type_ == 'ensemble':
            if self.kwargs['model_based'] == 'pulled': self.modelBased_collFilter.get_predictions(self.kwargs['weights_mod'])
            else: self.modelBased_collFilter.get_predictions()
            predictions = self.modelBased_collFilter.predictions
        if self.type_ == 'ensemble':
            predictions = self.memoryBased_collFilter.predictions + self.modelBased_collFilter.predictions

        ## normalize and convert to probabilities
        predictions           = (predictions - np.mean(predictions))/np.std(predictions)
        probabilities         = utils_functions.convert_to_probabilities(predictions, self.beta)
        probabilities\
            [self.data.attributs[self.data.user_id].nonzero()[0]] = 0
        if self.data.label == 'propositions': # in case of proposition estimation
            ## discount probabilities when recently skipped
            probabilities         = probabilities * self.gamma**self.penalize_skipped 
            ## augment the probabilities of the overall non-visited recommendations modulated by their impacts
            freq_recommendations  = 1./self.freq_recomm * self.recomm_impact
            probabilities         = probabilities * freq_recommendations/np.sum(freq_recommendations)

        ## normalize
        probabilities         = probabilities/sum(probabilities)
        ## sample from probabilities
        idxes_attributs = np.random.choice(np.where(probabilities>0)[0], size=np.sum(probabilities>0), replace=False, p=probabilities[probabilities>0])
        
        return idxes_attributs

    def sample(self):
        if not user_tests.available_attributs(self.data.user_id, self.data.attributs):
            return []
        try:
            return self._sample()
        except Exception as e:
            path  = 'engine/ml_modules/logs/log_ml.out'
            file_ = open(path, 'a')
            file_.write("type error: {0} ; user id {1}, predicting {2} \n".format(e, self.data.user_id, self.data.label))
            file_.close()
            return False



