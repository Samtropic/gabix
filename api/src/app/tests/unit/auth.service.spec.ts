import { encryptPassword } from '../../services/auth.service';

describe('authServices', () => {
  it('should encrypt Password', () => {
    const password = 'password';
    const salt = 'salt';
    expect(encryptPassword(password, salt)).toEqual('cJIAA4Rq5CXwCpTsMBw5ZKCiGJBpUNLekiVPWNCQzxjAcX0JsD91NMmqP/S7NfdW/9m3YA+LONGZAVb7/p0k0Q==');
  })
})