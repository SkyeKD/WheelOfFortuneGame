package com.example.demo.UserRecord;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "userRecord")
public class UserRecord {
  @Id
  Long id;

  String googleId;
  String name;

  public UserRecord(String googleId,String name) {
    this.googleId = googleId;
    this.name = name;
  }

  public long getId() {
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
  public String getName() {
  	return this.name;
  }
  
  public void setName(String name) {
  	this.name=name;
  }


  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", googleId:'" + this.googleId + '\'' +
            ", name:'" + this.name + '\'' +
        '}';
  }
}