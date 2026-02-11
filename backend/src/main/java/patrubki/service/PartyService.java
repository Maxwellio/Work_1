package patrubki.service;

import org.springframework.stereotype.Service;
import patrubki.dto.PartyDto;
import patrubki.entity.Party;
import patrubki.repository.PartyRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartyService {

    private final PartyRepository repository;

    public PartyService(PartyRepository repository) {
        this.repository = repository;
    }

    public List<PartyDto> findAllOrderByColParty() {
        return repository.findAllOrderByColParty().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private PartyDto toDto(Party entity) {
        PartyDto dto = new PartyDto();
        dto.setColParty(entity.getColParty());
        dto.setTsh(entity.getTsh());
        dto.setKtv(entity.getKtv());
        return dto;
    }
}
