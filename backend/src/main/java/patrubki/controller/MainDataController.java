package patrubki.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import patrubki.dto.FitingDto;
import patrubki.dto.HydrotestDto;
import patrubki.dto.MakeSubstituteMainDto;
import patrubki.service.FitingService;
import patrubki.service.HydrotestService;
import patrubki.service.MakeSubstituteMainService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainDataController {

    private final MakeSubstituteMainService substituteService;
    private final FitingService fitingService;
    private final HydrotestService hydrotestService;

    public MainDataController(MakeSubstituteMainService substituteService,
                              FitingService fitingService,
                              HydrotestService hydrotestService) {
        this.substituteService = substituteService;
        this.fitingService = fitingService;
        this.hydrotestService = hydrotestService;
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
}
