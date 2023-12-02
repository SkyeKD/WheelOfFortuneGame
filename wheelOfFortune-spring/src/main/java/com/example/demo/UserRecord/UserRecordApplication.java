package com.example.demo.UserRecord;

import com.google.common.collect.Lists;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
//@SpringBootApplication
public class UserRecordApplication {
  @Autowired
  UserRecordRepository userRecordRepository;

  public static void main(String[] args) {
     SpringApplication.run(UserRecordApplication.class, args);
  }

  @ShellMethod("Saves a user record to Cloud Datastore")
  public String saveUserRecord(String googleId,String name) {
     UserRecord savedUserRecord = this.userRecordRepository.save(new UserRecord(googleId,name));
     return savedUserRecord.toString();
  }

  @ShellMethod("Loads all books")
  public String findAllUserRecords() {
     Iterable<UserRecord> records = this.userRecordRepository.findAll();
     return Lists.newArrayList(records).toString();
  }

  @ShellMethod("Loads books by author: find-by-author <author>")
  public String findByGoogleId(String googleId) {
     List<UserRecord> userRecords = this.userRecordRepository.findByGoogleId(googleId);
     return userRecords.toString();
  }

//  @ShellMethod("Loads books published after a given year: find-by-year-after <year>")
//  public String findByYearAfter(int year) {
//     List<UserRecord> userRecords = this.userRecordRepository.findByYearGreaterThan(year);
//     return userRecords.toString();
//  }
//
//  @ShellMethod("Loads books by author and year: find-by-author-year <author> <year>")
//  public String findByAuthorYear(String author, int year) {
//     List<UserRecord> userRecords = this.userRecordRepository.findByAuthorAndYear(author, year);
//     return userRecords.toString();
//  }

//  @ShellMethod("Removes all books")
//  public void removeAllBooks() {
//     this.userRecordRepository.deleteAll();
//  }
}
