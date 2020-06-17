package smart.smartmusic.service;

import smart.smartmusic.pojo.Musicinfo;

import java.util.List;

public interface MusicService {
    List<Musicinfo> findAll();
    Musicinfo findMusicByid(Integer musicid);
}
