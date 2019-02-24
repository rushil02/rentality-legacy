import random
import string


def next_ref_code(old_ref_code):
    new_code = ""
    code_length = len(old_ref_code)
    prev_code = old_ref_code[::-1]
    i = 0
    while i < code_length:
        subcode = prev_code[i]
        try:
            int(subcode)
        except ValueError:
            try:
                new_char = string.ascii_uppercase[string.ascii_uppercase.index(subcode) + 1]
            except IndexError:
                new_code += string.ascii_uppercase[0]
                i += 1
                continue
            else:
                new_code += new_char
                i += 1
                break
        else:
            try:
                new_char = string.digits[string.digits.index(subcode) + 1]
            except IndexError:
                new_code += string.digits[0]
                i += 1
                continue
            else:
                new_code += new_char
                i += 1
                break

    if i == code_length:
        initial = [string.digits[0], string.ascii_uppercase[0]]
        new_code = new_code + random.choice(initial)
    else:
        new_code = new_code + prev_code[i:]

    return new_code[::-1]
