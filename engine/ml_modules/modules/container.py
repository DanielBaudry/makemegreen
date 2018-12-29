import numpy as np

class container:

    def __init__(self, arr_ppties, arr_pptions, user_id, label):
        self.possible_labels  = ['properties', 'propositions']
        assert(label in self.possible_labels), 'label must be in {0}'.format(self.possible_labels)
        self.arr_ppties       = arr_ppties
        self.arr_pptions      = arr_pptions
        self.user_id          = user_id
        self.nb_ppties        = arr_ppties.shape[-1]
        self.nb_pptions       = arr_pptions.shape[-1]       
        self.label            = label          # predict the properties(questions) or the propositions(recommendations)                      
        if self.label == 'propositions':
            self.attributs = self.arr_pptions
        else:
            self.attributs = self.arr_ppties     