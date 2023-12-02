package com.example.demo.GameRecord;

import com.google.common.collect.Lists;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
// @SpringBootApplication
public class GameRecordApplication {
  @Autowired GameRecordRepository gameRecordRepository;

  public static void main(String[] args) {
    SpringApplication.run(GameRecordApplication.class, args);
  }

  @ShellMethod("Saves a gameRecord to Cloud Datastore")
  public String saveGameRecord(String googleId, int score, String timestamp) {
    GameRecord savedGameRecord =
        this.gameRecordRepository.save(new GameRecord(googleId, score, timestamp));
    return savedGameRecord.toString();
  }

  @ShellMethod("Loads all records")
  public String findAllGameRecords() {
    Iterable<GameRecord> records = this.gameRecordRepository.findAll();
    return Lists.newArrayList(records).toString();
  }

  @ShellMethod("Loads records by googleId")
  public String findByGoogleId(String googleId) {
    List<GameRecord> records = this.gameRecordRepository.findByGoogleId(googleId);
    return records.toString();
  }

  @ShellMethod("Removes all records")
  public void removeAllRecords() {
    this.gameRecordRepository.deleteAll();
  }

  @ShellMethod("Delete records by GoogleId")
  public String deleteGameRecords(String googleId) {
    List<GameRecord> recordsToDelete = this.gameRecordRepository.findByGoogleId(googleId);

    if (recordsToDelete.isEmpty()) {
      return "No records found for the given GoogleId: " + googleId;
    }

    try {
      for (GameRecord record : recordsToDelete) {
        this.gameRecordRepository.delete(record);
      }

      return "Successfully deleted records for GoogleId: " + googleId;
    } catch (Exception e) {
      e.printStackTrace();
      return "An error occurred while deleting records.";
    }
  }
}
