import numpy as np
import engine.ml_modules.modules.user_tests as user_tests
import engine.ml_modules.modules.distances_functions as distances_functions
import engine.ml_modules.modules.utils as utils_functions

class model_based_collaborative_filtering():
    '''
    Model based collaborative filtering model : this module has now parameters. When well learnt, these collaborative filter performs
    significantly better than memory based filters, especially in the case of large datasets. We will develop two models:
    - one based on logistic regressions close to a hybrid version of matrix factorization called SVDfeatures (ref : T. Chen, 
    W. Zhang, Q. Lu, K. Chen, Z. Zheng, and Y. Yong. Svdfeature: a toolkit for feature-based collaborative filtering). This first model
    will be based on the paper https://arxiv.org/pdf/1507.08439.pdf
    - a second based on auto-encoders to learn a latent representation of the user profiles. 
    (ref : https://hal.inria.fr/hal-01336912v2/document )
    '''
    
    def __init__(self, data, type_):
        self.data        = data
        self.possible_types_  = ['logit', 'autoe', 'pulled']
        assert(type_ in self.possible_types_), 'type must be in {0}'.format(self.possible_types_)
        self.type_            = type_       
        return NotImplemented

    def get_predictions(self):
        return NotImplemented
        