package smart.smartmusic.service;


import smart.smartmusic.pojo.User;

import java.util.List;


public interface UserService {
   List<User> findAll();
   Boolean checkLogin(User user);
    Boolean checkReg(User user);

    String getUserName(Integer id);
}
