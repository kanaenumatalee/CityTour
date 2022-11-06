package com.techelevator.dao;

import com.techelevator.model.Itinerary;
import com.techelevator.model.Landmark;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class JdbcItineraryDao implements ItineraryDao{

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public JdbcItineraryDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Itinerary> findAll() {
        List<Itinerary> itineraries = new ArrayList<>();
        String sql = "select * from itinerary";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            Itinerary itinerary = mapRowToUser(results);
            itineraries.add(itinerary);
        }
        return itineraries;
    }

    @Override
    public Itinerary getItineraryByItineraryId(int itineraryId) {
        String sql = "SELECT * FROM itinerary WHERE itinerary_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, itineraryId);
        if(results.next()) {
            return mapRowToUser(results);
        } else {
            throw new RuntimeException("itineraryId " + itineraryId +
                    " was not found.");
        }
    }

    @Override
    public Itinerary findByItineraryName(String itineraryName) {
        return jdbcTemplate.queryForObject("SELECT itinerary_id FROM " +
                "itinerary WHERE itinerary_name = ?", Itinerary.class, itineraryName);
    }

    @Override
    public int findItineraryIdByItineraryName(String itineraryName) {
        return jdbcTemplate.queryForObject("SELECT itinerary_id FROM " +
                "itinerary WHERE itinerary_name = ?", int.class,itineraryName);
    }

    @Override
    public void createItinerary(Itinerary itinerary) {

        String sql = "INSERT INTO itinerary " +
                     "(itinerary_name, starting_point, itinerary_date, user_id) " +
                     "VALUES (?, ?, ?, ?)";

        jdbcTemplate.update(sql, itinerary.getItineraryName(), itinerary.getStartingPoint(), itinerary.getItineraryDate(), itinerary.getUserId()
                            );
    }

    private Itinerary mapRowToUser(SqlRowSet rs) {
        Itinerary itinerary = new Itinerary();
        itinerary.setItineraryId(rs.getInt("itinerary_id"));
        itinerary.setItineraryName(rs.getString("itinerary_name"));
        itinerary.setStartingPoint(rs.getString("starting_point"));
        itinerary.setItineraryDate(rs.getDate("itinerary_date").toLocalDate());
        return itinerary;
    }
}
