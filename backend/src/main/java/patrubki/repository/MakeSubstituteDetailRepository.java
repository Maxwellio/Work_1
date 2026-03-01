package patrubki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
=======
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
>>>>>>> Stashed changes
import patrubki.entity.MakeSubstituteDetail;

import java.util.List;

public interface MakeSubstituteDetailRepository extends JpaRepository<MakeSubstituteDetail, Integer> {

<<<<<<< Updated upstream
    List<MakeSubstituteDetail> findByIdSubstitutePrepared_IdSubstitutePreparedOrderBySeqNumOperAsc(Integer idSubstitutePrepared);
=======
    @Query("SELECT d FROM MakeSubstituteDetail d LEFT JOIN FETCH d.operation WHERE d.idSubstitutePrepared = :id ORDER BY d.seqNumOper")
    List<MakeSubstituteDetail> findByIdSubstitutePreparedOrderBySeqNumOper(@Param("id") Integer idSubstitutePrepared);
>>>>>>> Stashed changes
}
