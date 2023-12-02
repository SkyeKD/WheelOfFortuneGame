package com.example.demo.UserRecord;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import java.util.List;

public interface UserRecordRepository extends DatastoreRepository<UserRecord, Long> {

  List<UserRecord> findByGoogleId(String googleId);


}