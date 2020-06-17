package smart.smartmusic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import smart.smartmusic.pojo.Musicinfo;
import smart.smartmusic.pojo.MusicinfoExample;

@Mapper
public interface MusicinfoMapper {
    long countByExample(MusicinfoExample example);

    int deleteByExample(MusicinfoExample example);

    int deleteByPrimaryKey(Integer musicid);

    int insert(Musicinfo record);

    int insertSelective(Musicinfo record);

    List<Musicinfo> selectByExample(MusicinfoExample example);

    Musicinfo selectByPrimaryKey(Integer musicid);

    int updateByExampleSelective(@Param("record") Musicinfo record, @Param("example") MusicinfoExample example);

    int updateByExample(@Param("record") Musicinfo record, @Param("example") MusicinfoExample example);

    int updateByPrimaryKeySelective(Musicinfo record);

    int updateByPrimaryKey(Musicinfo record);
}