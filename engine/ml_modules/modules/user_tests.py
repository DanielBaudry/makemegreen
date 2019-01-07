import numpy as np

def available_attributs(user_id, attributs):
	# if all attributs were already proposed/answered, return False
	return sum(attributs[user_id] == 0) > 0

def test_values_distances(user_id, distances):
	# if all attributs were already proposed/answered, return False
	return sum(distances==0) == 1 and np.where(distances == 0)[0][0] == user_id