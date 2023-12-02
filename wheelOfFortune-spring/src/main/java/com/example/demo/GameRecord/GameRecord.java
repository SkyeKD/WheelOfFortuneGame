package com.example.demo.GameRecord;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "gameRecord")
public class GameRecord {
  @Id
  Long id;
  String googleId;
  int score;
  String timestamp;

  public GameRecord(String googleId, int score, String timestamp) {
    this.googleId = googleId;
    this.score = score;
    this.timestamp = timestamp;
  }

  public Long getId() {
    return this.id;
  }
  
  public void setId(Long id) {
  	this.id=id;
  }
  
  public String getGoogleId() {
  	return this.googleId;
  }
  
  public void setGoogleId(String googleId) {
  	this.googleId=googleId;
  }
   public int getScore() {
  	return this.score;
  }
  
  public void setScore(int score) {
  	this.score=score;
  }
  
  public String getTimestamp() {
  	return this.timestamp;
  }
  
  public void setTimestamp(String timestamp) {
  	this.timestamp=timestamp;
  }
  

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", GoogleId:'" + this.googleId + '\'' +
        ", score:'" + this.score + '\'' +
        ", timestamp:" + this.timestamp +
        '}';
  }
}