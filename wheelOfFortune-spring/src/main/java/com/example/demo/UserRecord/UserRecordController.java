package com.example.demo.UserRecord;

import com.example.demo.GameRecord.GameRecord;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRecordController {
  private final UserRecordRepository userRecordRepository;

  public UserRecordController(UserRecordRepository userRecordRepository) {
    this.userRecordRepository = userRecordRepository;
  }

  /**
   * save a userRecord
   *
   * @param userRecord (googleId, name)
   * @return message
   */
  @PostMapping("/user/saveUserRecord")
  @CrossOrigin(origins = "*")
  public String saveUserRecord(@RequestBody UserRecord userRecord) {
    if (userRecord == null) {
      return "The record is invalid";
    }

    // check if the record with the googleId exists
    List<UserRecord> existingRecord = userRecordRepository.findByGoogleId(userRecord.getGoogleId());

    if (existingRecord != null) {
      // if exists, update the record
      UserRecord recordToUpdate = existingRecord.get(0);
      recordToUpdate.setName(userRecord.getName());
      userRecordRepository.save(recordToUpdate);
      return "Record updated successfully";
    } else {
      // if not, save the new record
      userRecordRepository.save(userRecord);
      return "Record saved successfully";
    }
  }

  /**
   * find AllUserRecords
   *
   * @return JSON all UserRecords
   */
  @GetMapping("/user/findAllUserRecords")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<UserRecord> findAllUserRecords() {
    Iterable<UserRecord> books = this.userRecordRepository.findAll();
    List<UserRecord> userRecordList = new ArrayList<>();
    books.forEach(userRecordList::add);
    return userRecordList;
  }

  /**
   * find recordwith googleId
   *
   * @param googleId
   * @return JSON the record
   */
  @GetMapping("/user/findByGoogleId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<UserRecord> findByGoogleId(@RequestParam String googleId) {
    Iterable<UserRecord> records = this.userRecordRepository.findByGoogleId(googleId);
    List<UserRecord> recordsList = new ArrayList<>();
    records.forEach(recordsList::add);
    return recordsList;
  }
}
