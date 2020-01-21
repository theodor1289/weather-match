package com.weathermatch.dao;

import com.weathermatch.models.CurrentBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentBatchRepository extends JpaRepository<CurrentBatch, String> {
    CurrentBatch findById(Integer id);
}