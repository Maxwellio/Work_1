package patrubki.service;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import patrubki.dto.FitingDto;
import patrubki.dto.FitingSaveDto;
import patrubki.entity.Fiting;
import patrubki.repository.FitingRepository;
import patrubki.repository.PreformTypRepository;

import java.math.BigDecimal;
import java.sql.Types;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FitingService {

    private final FitingRepository repository;
    private final PreformTypRepository preformTypRepository;
    private final JdbcTemplate jdbcTemplate;

    public FitingService(FitingRepository repository,
                         PreformTypRepository preformTypRepository,
                         JdbcTemplate jdbcTemplate) {
        this.repository = repository;
        this.preformTypRepository = preformTypRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveFitting(FitingSaveDto dto) {
        String sql = "CALL substiute.add_edit_fiting(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        Object[] args = {
                dto.getId(),
                dto.getTip(),
                dto.getNm(),
                dto.getD(),
                dto.getTh(),
                dto.getL(),
                dto.getMass(),
                dto.getIdPreform(),
                dto.getLPreform(),
                dto.getPhPreform(),
                dto.getDStan(),
                dto.getCnt(),
                dto.getIdUserCreator()
        };
        int[] argTypes = {
                Types.INTEGER,
                Types.INTEGER,
                Types.VARCHAR,
                Types.NUMERIC,
                Types.NUMERIC,
                Types.NUMERIC,
                Types.NUMERIC,
                Types.INTEGER,
                Types.NUMERIC,
                Types.NUMERIC,
                Types.NUMERIC,
                Types.VARCHAR,
                Types.INTEGER
        };
        jdbcTemplate.update(sql, args, argTypes);
    }

    public List<FitingDto> findByTipOrderByNm(int tip, String search) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findByTipOrderByNmAsc(BigDecimal.valueOf(tip), searchParam).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<FitingDto> findByTipOrderByNm(int tip, String search, Integer userId) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findByTipOrderByNmAsc(BigDecimal.valueOf(tip), searchParam, userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
    }

    private FitingDto toDto(Fiting e) {
        FitingDto dto = new FitingDto();
        dto.setIdFiting(e.getIdFiting());
        dto.setIdPreform(e.getIdPreform());
        dto.setNm(e.getNm());
        dto.setTip(e.getTip());
        dto.setD(e.getD());
        dto.setTh(e.getTh());
        dto.setMass(e.getMass());
        dto.setL(e.getL());
        dto.setDStan(e.getDStan());
        dto.setLPreform(e.getLPreform());
        dto.setPhPreform(e.getPhPreform());
        dto.setTSum(e.getTSum());
        dto.setCnt(e.getCnt());
        dto.setIdUserCreator(e.getIdUserCreator());
        if (e.getIdPreform() != null) {
            preformTypRepository.findById(e.getIdPreform()).ifPresent(p -> dto.setNmPreform(p.getNmPreform()));
        }
        return dto;
    }
}
