package patrubki.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import patrubki.dto.FitingDto;
import patrubki.entity.Fiting;
import patrubki.repository.FitingRepository;
import patrubki.repository.PreformTypRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FitingService {

    private final FitingRepository repository;
    private final PreformTypRepository preformTypRepository;

    public FitingService(FitingRepository repository, PreformTypRepository preformTypRepository) {
        this.repository = repository;
        this.preformTypRepository = preformTypRepository;
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
