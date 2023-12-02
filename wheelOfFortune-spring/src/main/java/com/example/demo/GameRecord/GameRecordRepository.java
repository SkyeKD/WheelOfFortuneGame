package com.example.demo.GameRecord;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import java.util.List;

public interface GameRecordRepository extends DatastoreRepository<GameRecord, Long> {

  List<GameRecord> findByGoogleId(String googleId);

}