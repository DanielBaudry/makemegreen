import numpy as np

def get_number_common_ans_attributs(user_id, attribut):
	return np.sum((attribut != 0) * (attribut[user_id] != 0), axis=1)

def convert_to_probabilities(*args):
	if len(args) == 1:
		return 0.5 * (args[0] + 1)
	elif len(args) == 2:
		return 1./(1 + np.exp(-args[0] * args[1]))
	else:
		raise IndexError('Wrong number of arguments')

def compute_weighted_std(weights, samples):
	weights = weights/sum(weights)
	means_  = np.sum(np.expand_dims(weights, -1) * samples, axis=0)
	return np.sqrt(np.sum(np.expand_dims(weights, -1) * (samples - means_)**2, axis=0))

def standardize(values, min_value, max_value):
	intermediate = (values - np.min(values))/(np.max(values) - np.min(values))
	return intermediate * (max_value - min_value) + min_value



