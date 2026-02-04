package patrubki.service;

import org.springframework.stereotype.Service;
import patrubki.dto.FitingDto;
import patrubki.entity.Fiting;
import patrubki.repository.FitingRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FitingService {

    private final FitingRepository repository;

    public FitingService(FitingRepository repository) {
        this.repository = repository;
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
        return dto;
    }
}
