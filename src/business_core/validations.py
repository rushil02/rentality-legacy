# from sympy.solvers import solve
# from sympy import Symbol
#
# HOC = 0.04
# TC = 0.08
# TAX_r = 0.1
# TAX_s = 0.1
#
#
# class FeeModelValidator(object):
#
#     def __init__(self, fee, payment_gateway):
#         self.fee = fee
#         self.payment_gateway = payment_gateway
#
#     def get_earnings(self):
#         self.fee
#
#
# def cal(x, w):
#     x = Symbol('x')
#     y = 4 * x - 0.04 * (w * x)
#
#     earning = TC * (4 * x) + HOC * (w * x)
#
#     expense1 = 2 + 0.0025 * y + 0.25
#     expense2 = 0.029 * 4 * x + 0.3
#
#     earning_after_tax = (1 - TAX_r) * earning
#     total_expenses = (TAX_s + 1) * expense1 + expense2
#
#     # voila_profit = earning_after_tax - total_expenses
#
#     val = solve(earning_after_tax - total_expenses)
#
#
