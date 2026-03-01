package patrubki.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import java.math.BigDecimal;

public class MakeSubstituteDetailDto {

<<<<<<< Updated upstream
    @JsonProperty("idMakeSubstitute")
    private Integer idMakeSubstitute;

    @JsonProperty("idOperations")
    private Integer idOperations;
=======
    @JsonProperty("seqNumOper")
    private Integer seqNumOper;
>>>>>>> Stashed changes

    @JsonProperty("nmOperations")
    private String nmOperations;

<<<<<<< Updated upstream
    @JsonProperty("seqNumOper")
    private Integer seqNumOper;

    @JsonProperty("d")
    private BigDecimal d;

    @JsonProperty("l")
    private BigDecimal l;
=======
    @JsonProperty("d")
    private BigDecimal d;

    @JsonProperty("lCalc")
    private BigDecimal lCalc;
>>>>>>> Stashed changes

    @JsonProperty("valueMeas")
    private BigDecimal valueMeas;

<<<<<<< Updated upstream
    @JsonProperty("idSubstitutePrepared")
    private Integer idSubstitutePrepared;
=======
    @JsonProperty("depthCut")
    private BigDecimal depthCut;
>>>>>>> Stashed changes

    @JsonProperty("i")
    private Integer i;

<<<<<<< Updated upstream
    @JsonProperty("depthCut")
    private BigDecimal depthCut;
=======
    @JsonProperty("s")
    private BigDecimal s;
>>>>>>> Stashed changes

    @JsonProperty("n")
    private BigDecimal n;

<<<<<<< Updated upstream
    @JsonProperty("s")
    private BigDecimal s;
=======
    @JsonProperty("vRez")
    private BigDecimal vRez;
>>>>>>> Stashed changes

    @JsonProperty("tMach")
    private BigDecimal tMach;

    @JsonProperty("tVp")
    private BigDecimal tVp;

<<<<<<< Updated upstream
    @JsonProperty("vRez")
    private BigDecimal vRez;

    @JsonProperty("masCur")
    private BigDecimal masCur;

    @JsonProperty("lCur")
    private BigDecimal lCur;

    @JsonProperty("tVpNbdt")
    private BigDecimal tVpNbdt;

    @JsonProperty("idUserCreator")
    private Integer idUserCreator;

    public Integer getIdMakeSubstitute() {
        return idMakeSubstitute;
    }

    public void setIdMakeSubstitute(Integer idMakeSubstitute) {
        this.idMakeSubstitute = idMakeSubstitute;
    }

    public Integer getIdOperations() {
        return idOperations;
    }

    public void setIdOperations(Integer idOperations) {
        this.idOperations = idOperations;
=======
    @JsonProperty("tSum")
    private BigDecimal tSum;

    public Integer getSeqNumOper() {
        return seqNumOper;
    }

    public void setSeqNumOper(Integer seqNumOper) {
        this.seqNumOper = seqNumOper;
>>>>>>> Stashed changes
    }

    public String getNmOperations() {
        return nmOperations;
    }

    public void setNmOperations(String nmOperations) {
        this.nmOperations = nmOperations;
    }

<<<<<<< Updated upstream
    public Integer getSeqNumOper() {
        return seqNumOper;
    }

    public void setSeqNumOper(Integer seqNumOper) {
        this.seqNumOper = seqNumOper;
    }

=======
>>>>>>> Stashed changes
    public BigDecimal getD() {
        return d;
    }

    public void setD(BigDecimal d) {
        this.d = d;
    }

<<<<<<< Updated upstream
    public BigDecimal getL() {
        return l;
    }

    public void setL(BigDecimal l) {
        this.l = l;
=======
    public BigDecimal getlCalc() {
        return lCalc;
    }

    public void setlCalc(BigDecimal lCalc) {
        this.lCalc = lCalc;
>>>>>>> Stashed changes
    }

    public BigDecimal getValueMeas() {
        return valueMeas;
    }

    public void setValueMeas(BigDecimal valueMeas) {
        this.valueMeas = valueMeas;
    }

<<<<<<< Updated upstream
    public Integer getIdSubstitutePrepared() {
        return idSubstitutePrepared;
    }

    public void setIdSubstitutePrepared(Integer idSubstitutePrepared) {
        this.idSubstitutePrepared = idSubstitutePrepared;
=======
    public BigDecimal getDepthCut() {
        return depthCut;
    }

    public void setDepthCut(BigDecimal depthCut) {
        this.depthCut = depthCut;
>>>>>>> Stashed changes
    }

    public Integer getI() {
        return i;
    }

    public void setI(Integer i) {
        this.i = i;
    }

<<<<<<< Updated upstream
    public BigDecimal getDepthCut() {
        return depthCut;
    }

    public void setDepthCut(BigDecimal depthCut) {
        this.depthCut = depthCut;
=======
    public BigDecimal getS() {
        return s;
    }

    public void setS(BigDecimal s) {
        this.s = s;
>>>>>>> Stashed changes
    }

    public BigDecimal getN() {
        return n;
    }

    public void setN(BigDecimal n) {
        this.n = n;
    }

<<<<<<< Updated upstream
    public BigDecimal getS() {
        return s;
    }

    public void setS(BigDecimal s) {
        this.s = s;
=======
    public BigDecimal getVRez() {
        return vRez;
    }

    public void setVRez(BigDecimal vRez) {
        this.vRez = vRez;
>>>>>>> Stashed changes
    }

    public BigDecimal getTMach() {
        return tMach;
    }

    public void setTMach(BigDecimal tMach) {
        this.tMach = tMach;
    }

    public BigDecimal getTVp() {
        return tVp;
    }

    public void setTVp(BigDecimal tVp) {
        this.tVp = tVp;
    }

<<<<<<< Updated upstream
    public BigDecimal getVRez() {
        return vRez;
    }

    public void setVRez(BigDecimal vRez) {
        this.vRez = vRez;
    }

    public BigDecimal getMasCur() {
        return masCur;
    }

    public void setMasCur(BigDecimal masCur) {
        this.masCur = masCur;
    }

    public BigDecimal getLCur() {
        return lCur;
    }

    public void setLCur(BigDecimal lCur) {
        this.lCur = lCur;
    }

    public BigDecimal getTVpNbdt() {
        return tVpNbdt;
    }

    public void setTVpNbdt(BigDecimal tVpNbdt) {
        this.tVpNbdt = tVpNbdt;
    }

    public Integer getIdUserCreator() {
        return idUserCreator;
    }

    public void setIdUserCreator(Integer idUserCreator) {
        this.idUserCreator = idUserCreator;
=======
    public BigDecimal getTSum() {
        return tSum;
    }

    public void setTSum(BigDecimal tSum) {
        this.tSum = tSum;
>>>>>>> Stashed changes
    }
}
