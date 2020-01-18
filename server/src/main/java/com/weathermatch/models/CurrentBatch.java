package com.weathermatch.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "current_batch")
public class CurrentBatch {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private final Integer id = 1;

    @Column(name = "resume_index")
    private Integer resumeIndex;

    public CurrentBatch() {
    }

    public Integer getResumeIndex() {
        return resumeIndex;
    }

    public CurrentBatch(int resumeIndex) {
        this.resumeIndex = resumeIndex;
    }

    public void setResumeIndex(Integer resumeIndex) {
        this.resumeIndex = resumeIndex;
    }
}
