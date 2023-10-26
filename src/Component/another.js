<Nav_Bar />
      <div className="search-donors-container">
        <Autocomplete
          className="search-donors-input"
          name="bloodGroup"
          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Blood Group"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('bloodGroup', value)}
        />
        <Autocomplete
          className="search-donors-input"
          name="district"
          options={bangladeshDistricts}
          renderInput={(params) => (
            <TextField
              {...params}
              label="District"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('district', value)}
          multiple={true}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
        />

        <Autocomplete
          className="search-donors-input"
          name="donorType"
          options={['All', 'Eligible']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Donor Type"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('donorType', value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          style={{ height: '50px', width: '80px' }}
        >
          Search
        </Button>
      </div>