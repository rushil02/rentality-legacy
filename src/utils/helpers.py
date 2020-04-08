def merge_dicts(d1, d2):
    """
    d1 is updated recursively with newer values in d2
    Note: list merges are not supported for nested objects
    :param d1: json like dictionary 1
    :param d2: json like dictionary 2
    :return: merged dictionary
    """

    for key in d2.keys():
        if isinstance(d1.get(key, None), type(d2[key])):
            if isinstance(d2[key], dict):
                d1[key] = merge_dicts(d1[key], d2[key])
            elif isinstance(d2[key], list):
                d1[key].extend(d2[key])
                d1[key] = list(set(d1[key]))
            else:
                d1[key] = d2[key]
    return d1
