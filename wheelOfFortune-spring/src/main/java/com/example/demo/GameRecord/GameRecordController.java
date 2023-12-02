package com.example.demo.GameRecord;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameRecordController {
  private final GameRecordRepository gameRecordRepository;

  public GameRecordController(GameRecordRepository gameRecordRepository) {
    this.gameRecordRepository = gameRecordRepository;
  }

  /**
   * save a gameRecord to the database
   *
   * @param record (googleId,score,date)
   * @return message
   */
  @PostMapping("/game/saveGameRecord")
  @CrossOrigin(origins = "*")
  public String saveGameRecord(@RequestBody GameRecord record) {
    if (record == null) {
      return "The record is invalid";
    }
    this.gameRecordRepository.save(record);
    return "success";
  }

  /**
   * find all game records
   *
   * @return JSON all game records
   */
  @GetMapping("/game/findAllGameRecords")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<GameRecord> findAllGameRecords() {
    Iterable<GameRecord> records = this.gameRecordRepository.findAll();
    List<GameRecord> recordsList = new ArrayList<>();
    records.forEach(recordsList::add);
    return recordsList;
  }

  /**
   * find the records by googleId
   *
   * @param googleId
   * @return JSON records with the googleId
   */
  @GetMapping("/game/findByGoogleId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<GameRecord> findByGoogleId(@RequestParam String googleId) {
    Iterable<GameRecord> records = this.gameRecordRepository.findByGoogleId(googleId);
    List<GameRecord> recordsList = new ArrayList<>();
    records.forEach(recordsList::add);
    return recordsList;
  }

  /**
   * delete game records
   *
   * @param id identify which record to delete
   * @return message
   */
  @DeleteMapping("/game/deleteGameRecord/{id}")
  @CrossOrigin(origins = "*")
  public String deleteGameRecord(@PathVariable Long id) {
    try {
      // find the record according to the id
      GameRecord recordToDelete =
          gameRecordRepository
              .findById(id)
              .orElseThrow(() -> new IllegalArgumentException("Record not found with id: " + id));

      gameRecordRepository.delete(recordToDelete);

      return "delete success";
    } catch (Exception e) {
      e.printStackTrace();
      return "An error occurred while deleting the record.";
    }
  }
}
