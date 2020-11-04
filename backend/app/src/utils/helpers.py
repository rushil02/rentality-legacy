def merge_dicts(d1, d2):
    """
    d1 is updated recursively with newer values in d2.
    If the type of value in either dicts for a specific key do not match, value for d1 is
    replaced by value of d2 for the respective key.
    Note: Lists are treated as immutable
    :param d1: json like dictionary 1
    :param d2: json like dictionary 2
    :return: merged dictionary
    """

    for key in d2.keys():
        if isinstance(d1.get(key, None), type(d2[key])) and isinstance(d2[key], dict):
            d1[key] = merge_dicts(d1[key], d2[key])
        else:
            d1[key] = d2[key]
    return d1
