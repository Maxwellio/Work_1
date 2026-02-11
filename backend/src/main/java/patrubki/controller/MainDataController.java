package patrubki.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import patrubki.dto.FitingDto;
import patrubki.dto.HydrotestDto;
import patrubki.dto.MakeSubstituteMainDto;
import patrubki.dto.PartyDto;
import patrubki.dto.PreformTypDto;
import patrubki.dto.FitingSaveDto;
import patrubki.dto.SubstituteSaveDto;
import patrubki.service.FitingService;
import patrubki.service.HydrotestService;
import patrubki.service.MakeSubstituteMainService;
import patrubki.service.PartyService;
import patrubki.service.PreformTypService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainDataController {

    private final MakeSubstituteMainService substituteService;
    private final FitingService fitingService;
    private final HydrotestService hydrotestService;
    private final PreformTypService preformTypService;
    private final PartyService partyService;

    public MainDataController(MakeSubstituteMainService substituteService,
                              FitingService fitingService,
                              HydrotestService hydrotestService,
                              PreformTypService preformTypService,
                              PartyService partyService) {
        this.substituteService = substituteService;
        this.fitingService = fitingService;
        this.hydrotestService = hydrotestService;
        this.preformTypService = preformTypService;
        this.partyService = partyService;
    }

    @GetMapping("/substitutes")
    public ResponseEntity<List<MakeSubstituteMainDto>> getSubstitutes(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(substituteService.findAllOrderByName(search, userId));
        }
        return ResponseEntity.ok(substituteService.findAllOrderByName(search));
    }

    @GetMapping("/fittings")
    public ResponseEntity<List<FitingDto>> getFittings(
            @RequestParam int tip,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(fitingService.findByTipOrderByNm(tip, search, userId));
        }
        return ResponseEntity.ok(fitingService.findByTipOrderByNm(tip, search));
    }

    @GetMapping("/hydrotests")
    public ResponseEntity<List<HydrotestDto>> getHydrotests(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(hydrotestService.findAllOrderByNh(search, userId));
        }
        return ResponseEntity.ok(hydrotestService.findAllOrderByNh(search));
    }

    @GetMapping("/preform-types")
    public ResponseEntity<List<PreformTypDto>> getPreformTypes() {
        return ResponseEntity.ok(preformTypService.findAllOrderByName());
    }

    @GetMapping("/party")
    public ResponseEntity<List<PartyDto>> getParty() {
        return ResponseEntity.ok(partyService.findAllOrderByColParty());
    }

    @PostMapping("/substitutes")
    public ResponseEntity<Void> saveSubstitute(@RequestBody SubstituteSaveDto body) {
        substituteService.saveSubstitute(body);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/substitutes/{id}")
    public ResponseEntity<Void> deleteSubstitute(@PathVariable Integer id) {
        substituteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/fittings")
    public ResponseEntity<Void> saveFitting(@RequestBody FitingSaveDto body) {
        fitingService.saveFitting(body);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/fittings/{id}")
    public ResponseEntity<Void> deleteFitting(@PathVariable Integer id) {
        fitingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/hydrotests/{id}")
    public ResponseEntity<Void> deleteHydrotest(@PathVariable Integer id) {
        hydrotestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
