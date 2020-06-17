package smart.smartmusic.service;

import smart.smartmusic.pojo.UserMusicKey;

import java.util.List;

public interface UserMusicService {
    List<UserMusicKey> findKeysById(Integer id);
    Boolean addMusicByUserMusicKey(UserMusicKey userMusic);
    Boolean removeMusicByUserMusicKey(UserMusicKey userMusic);
    Boolean removeMusicByUserID(Integer id);
}
