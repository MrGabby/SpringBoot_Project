package com.cropdeal.repository;

import com.cropdeal.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    List<Invoice> findByUserid(Integer userid);

    List<Invoice> findByDealerid(Integer dealerid);

    @Query("SELECT DISTINCT i FROM Invoice i JOIN i.items item WHERE item.farmerid = :farmerid")
    List<Invoice> findByFarmeridInItems(@Param("farmerid") Integer farmerid);
}
