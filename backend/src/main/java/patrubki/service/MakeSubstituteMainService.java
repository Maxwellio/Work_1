package patrubki.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import patrubki.dto.MakeSubstituteMainDto;
import patrubki.entity.MakeSubstituteMain;
import patrubki.repository.MakeSubstituteMainRepository;
import patrubki.repository.PreformTypRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MakeSubstituteMainService {

    private final MakeSubstituteMainRepository repository;
    private final PreformTypRepository preformTypRepository;

    public MakeSubstituteMainService(MakeSubstituteMainRepository repository,
                                     PreformTypRepository preformTypRepository) {
        this.repository = repository;
        this.preformTypRepository = preformTypRepository;
    }

    public List<MakeSubstituteMainDto> findAllOrderByName(String search) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findAllOrderByName(searchParam).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<MakeSubstituteMainDto> findAllOrderByName(String search, Integer userId) {
        String searchParam = (search != null && search.trim().isEmpty()) ? null : search;
        return repository.findAllOrderByName(searchParam, userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
    }

    private String buildName(MakeSubstituteMain e) {
        String s1 = e.getNmSub1() != null ? e.getNmSub1() : "";
        String s2 = e.getNmSub2() != null ? e.getNmSub2() : "";
        String s3 = e.getNmSub3() != null ? e.getNmSub3() : "";
        String s4 = e.getNmSub4() != null ? e.getNmSub4() : "";
        String s5 = e.getNmSub5() != null ? e.getNmSub5() : "";
        return s1 + " - " + s2 + " - " + s3 + " x " + s4 + " - " + s5;
    }

    private MakeSubstituteMainDto toDto(MakeSubstituteMain e) {
        MakeSubstituteMainDto dto = new MakeSubstituteMainDto();
        dto.setIdSubstitutePrepared(e.getIdSubstitutePrepared());
        dto.setIdPreform(e.getIdPreform());
        dto.setName(buildName(e));
        dto.setDPreformOut(e.getDPreformOut());
        dto.setDPreformIn(e.getDPreformIn());
        dto.setPh(e.getPh());
        dto.setLPreform(e.getLPreform());
        dto.setMassPreform(e.getMassPreform());
        dto.setTSum(e.getTSum());
        dto.setDSubstituteOut(e.getDSubstituteOut());
        dto.setDSubstituteIn(e.getDSubstituteIn());
        dto.setLSubstiute(e.getLSubstiute());
        dto.setNmSub1(e.getNmSub1());
        dto.setNmSub2(e.getNmSub2());
        dto.setNmSub3(e.getNmSub3());
        dto.setNmSub4(e.getNmSub4());
        dto.setNmSub5(e.getNmSub5());
        dto.setIdUserCreator(e.getIdUserCreator());
        if (e.getIdPreform() != null) {
            preformTypRepository.findById(e.getIdPreform()).ifPresent(p -> dto.setNmPreform(p.getNmPreform()));
        }
        return dto;
    }
}
