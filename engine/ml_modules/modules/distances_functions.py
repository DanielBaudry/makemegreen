import numpy as np

def _cosine_similarity(X):
    X_norm         = np.linalg.norm(X, axis=1)                            # calculate norm
    scalar_product = np.matmul(X, X.T)                                    # calculate scalar product
    distances      = np.nan_to_num(np.transpose(scalar_product.T/X_norm)/X_norm) 
    np.fill_diagonal(distances, 0)  
    return distances                                                      # return result

def _cosine_similarity2(X, user_id):
    distances               = _cosine_similarity(X)
    distances[:,user_id]    = 0 # take out similarity with user of interest
    prediction              = predict_cosine(distances, X)
    prediction[X!=0]        = X[X!=0]
    distances_2order        = _cosine_similarity(prediction)
    return distances_2order

def predict_cosine(distances, X):
    prediction                       = np.matmul(distances, X)/np.expand_dims(np.sum(np.abs(distances), axis=0), -1)
    prediction[X!=0]                 = X[X!=0]
    prediction[np.isinf(prediction)] = 0
    return np.nan_to_num(prediction)

def cosine_similarity(user_id, attributs, type_='2order'):
    assert(user_id < (len(attributs) - 1)), 'python indexing start at 0'
    if type_ == '1order':
        return _cosine_similarity(attributs)
    elif type_ == '2order':
        return _cosine_similarity2(attributs, user_id)
    else:
        raise SyntaxError('type_ must be 1order or 2order')


         