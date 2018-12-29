import numpy as np
import engine.ml_modules.modules.user_tests as user_tests
import engine.ml_modules.modules.distances_functions as distances_functions
import engine.ml_modules.modules.utils as utils_functions

# source : https://towardsdatascience.com/various-implementations-of-collaborative-filtering-100385c6dfe0
class memory_based_collaborative_filtering():
    '''
    Memory based collaborative filter : parameter free recommendation engine. Performs in general rather poorly when there is a lot
    of data. However, in the case of small data amount, it is a good solution as no parameter learning is required. This filter has
    three modes:
    - '1order' : the distances is calculated between the user of interest and other users to obtain the prediction
    - '2order' : the distances between all users is calculated by taking out our user of interest and a first prediction
    is obtained for all users. A second distance is then calculated between our user and these reconstructed users. This second
    mode allows for better question penalization (as users do not answer the same number of questions, penalization is important
    when little questions were answered).
    - 'pulled' : performs a simple mean between the 1order and 2order distances.
    '''

    def __init__(self, data, type_):   
        self.data        = data
        self.possible_types_  = ['1order', '2order', 'pulled']
        assert(type_ in self.possible_types_), 'type must be in {0}'.format(self.possible_types_)
        self.type_            = type_        

    def get_predictions(self, *args):
        if self.type_ != 'pulled':
            distances_ppties   = distances_functions.cosine_similarity(self.data.user_id, self.data.arr_ppties  , type_=self.type_)
            distances_pptions  = distances_functions.cosine_similarity(self.data.user_id, self.data.arr_pptions , type_=self.type_)
        else:
            if len(args) == 0 : w_1order, w_2order = 0.5, 0.5
            else: assert(len(args[0]) == 2), 'wrong number of arguments'; w_1order, w_2order = args[0]
            distances_ppties   = distances_functions.cosine_similarity \
                                            (self.data.user_id, self.data.arr_ppties, type_=self.possible_types_[0]) * w_1order \
                               + distances_functions.cosine_similarity \
                                            (self.data.user_id, self.data.arr_ppties, type_=self.possible_types_[1]) * w_2order

            distances_pptions  = distances_functions.cosine_similarity \
                                            (self.data.user_id, self.data.arr_pptions, type_=self.possible_types_[0]) * w_1order \
                               + distances_functions.cosine_similarity \
                                            (self.data.user_id, self.data.arr_pptions, type_=self.possible_types_[1]) * w_2order

        # standardize both distances according to the attribut of interest by assuming the same universe for both properties
        include = np.ones(distances_pptions.shape, bool); np.fill_diagonal(include, False)
        if self.data.label == 'properties':
            distances_pptions[include] = utils_functions.standardize(distances_pptions[include], \
                                                                                 np.min(distances_ppties[include]), \
                                                                                 np.max(distances_ppties[include]))
        else:
            distances_ppties[include]  = utils_functions.standardize(distances_ppties[include], \
                                                                                 np.min(distances_pptions[include]), \
                                                                                 np.max(distances_pptions[include]))

        # weighted sum of both distances        
        weights_ppties     = utils_functions.get_number_common_ans_attributs(self.data.user_id, self.data.arr_ppties)/self.data.nb_ppties
        weights_pptions    = utils_functions.get_number_common_ans_attributs(self.data.user_id, self.data.arr_pptions)/self.data.nb_pptions
        sum_weights        = (weights_ppties + weights_pptions)

        self.distances     = distances_ppties * weights_ppties / sum_weights + \
                                            distances_pptions * weights_pptions / sum_weights

        assert(user_tests.test_values_distances(self.data.user_id, self.distances[self.data.user_id])), 'There is an anomaly in the distances values'

        if self.data.label == 'properties':
            estimated_ppties      = distances_functions.predict_cosine(self.distances, self.data.attributs)
            weights               = np.zeros(self.distances.shape)
            weights[include]      = utils_functions.standardize(self.distances[include], 0, 1)
            self.predictions      = utils_functions.compute_weighted_std(weights[self.data.user_id], estimated_ppties)
        else:
            self.predictions = distances_functions.predict_cosine(self.distances, self.data.attributs)[self.data.user_id]
   









        




