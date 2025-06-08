package timeentry

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	sqldb "stb/app/server/internal/db/sql"
	"stb/app/server/internal/server"
	sqlro "stb/app/server/internal/time_entry/sql_ro"
	sqlrw "stb/app/server/internal/time_entry/sql_rw"
)

type timeEntryRepo struct {
	roQueries *sqlro.Queries
	rwQueries *sqlrw.Queries
	ctx       context.Context
}

func (r *timeEntryRepo) Get() (*[]sqlro.GetTimeEntriesRow, error) {
	timeEntries, err := r.roQueries.GetTimeEntries(r.ctx)
	if err != nil {
		return nil, err
	}
	return &timeEntries, nil
}

var _, filename, _, _ = runtime.Caller(0)
var mockDataPath = filepath.Join(filepath.Dir(filepath.Dir(filepath.Dir(filename))), "internal", "time_entry", "mockData.json")

func (r *timeEntryRepo) GetMock() (*[]server.TimeEntry, error) {
	mockJsonByteSlice, err := os.ReadFile(mockDataPath)
	if err != nil {
		return nil, err
	}
	mockTimeEntry := []server.TimeEntry{}
	err = json.Unmarshal(mockJsonByteSlice, &mockTimeEntry)
	if err != nil {
		return nil, err
	}
	return &mockTimeEntry, nil
}

func (r *timeEntryRepo) Create(timeEntry sqlrw.CreateTimeEntryParams) (int32, error) {
	timeEntryId, err := r.rwQueries.CreateTimeEntry(r.ctx, timeEntry)
	if err != nil {
		return 0, err
	}
	return timeEntryId, nil
}

func (r *timeEntryRepo) Update(timeEntry sqlrw.UpdateTimeEntryParams) error {
	err := r.rwQueries.UpdateTimeEntry(r.ctx, timeEntry)
	if err != nil {
		return err
	}
	return nil
}

var TimeEntryRepo = &timeEntryRepo{
	roQueries: sqlro.New(sqldb.RoHandle.Pool),
	rwQueries: sqlrw.New(sqldb.RwHandle.Pool),
	ctx:       context.Background(),
}
