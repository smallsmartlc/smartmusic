package smart.smartmusic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.smartmusic.mapper.MusicinfoMapper;
import smart.smartmusic.pojo.Musicinfo;
import smart.smartmusic.pojo.MusicinfoExample;

import java.util.List;

@Service
public class MusicServiceImpl implements MusicService{
    @Autowired
    private MusicinfoMapper musicinfoMapper;
    @Override
    public List<Musicinfo> findAll() {
        MusicinfoExample example = new MusicinfoExample();
        return this.musicinfoMapper.selectByExample(example);
    }

    @Override
    public Musicinfo findMusicByid(Integer musicid) {
        return this.musicinfoMapper.selectByPrimaryKey(musicid);
    }
}
