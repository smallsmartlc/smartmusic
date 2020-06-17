package smart.smartmusic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.smartmusic.mapper.UserMusicMapper;
import smart.smartmusic.pojo.UserMusicKey;

import java.util.List;

@Service
public class UserMusicServiceImpl implements UserMusicService{

    @Autowired
    private UserMusicMapper userMusicMapper;

    @Override
    public List<UserMusicKey> findKeysById(Integer id) {
        return this.userMusicMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean addMusicByUserMusicKey(UserMusicKey userMusic) {
        try {
            this.userMusicMapper.insert(userMusic);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean removeMusicByUserMusicKey(UserMusicKey userMusic) {
        try {
            this.userMusicMapper.deleteByPrimaryKey(userMusic);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean removeMusicByUserID(Integer id) {
        try {
            this.userMusicMapper.deleteByUserID(id);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}
