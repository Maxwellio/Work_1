package patrubki.service;

import org.springframework.stereotype.Service;
import patrubki.dto.HydrotestDto;
import patrubki.entity.Hydrotest;
import patrubki.repository.HydrotestRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HydrotestService {

    private final HydrotestRepository repository;

    public HydrotestService(HydrotestRepository repository) {
        this.repository = repository;
    }

    public List<HydrotestDto> findAllOrderByNh(String search) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findAllOrderByNhAsc(searchParam).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<HydrotestDto> findAllOrderByNh(String search, Integer userId) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findAllOrderByNhAsc(searchParam, userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private HydrotestDto toDto(Hydrotest e) {
        HydrotestDto dto = new HydrotestDto();
        dto.setIdHydrotest(e.getIdHydrotest());
        dto.setNh(e.getNh());
        dto.setD(e.getD());
        dto.setL(e.getL());
        dto.setTh(e.getTh());
        dto.setTesttime(e.getTesttime());
        dto.setMass(e.getMass());
        dto.setL1(e.getL1());
        dto.setL2(e.getL2());
        dto.setNv(e.getNv());
        dto.setIdUserCreator(e.getIdUserCreator());
        return dto;
    }
}
