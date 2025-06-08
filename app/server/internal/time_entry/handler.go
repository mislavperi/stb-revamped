package timeentry

import (
	"context"
	"stb/app/server/internal/server"
	session "stb/app/server/internal/session"
	logger "stb/app/server/util/log"
)

type TimeEntryHandler struct{}

var _ server.TimeEntryHandler = (*TimeEntryHandler)(nil)

func (h *TimeEntryHandler) CreateTimeEntry(ctx context.Context, req *server.CreateTimeEntryRequestBody) (server.CreateTimeEntryRes, error) {
	return nil, nil
}

func (h *TimeEntryHandler) GetTimeEntries(ctx context.Context) (server.GetTimeEntriesRes, error) {
	session, err := session.GetSessionFromContext(ctx)
	if err != nil || session == nil {
		return &server.GetTimeEntriesUnauthorized{
			Message: "Unauthorized",
		}, nil
	}
	logger.Logger.Info("session", "ID of requesting user", session.UserID)

	timeEntriesFromDb, err := TimeEntryRepo.Get()
	if err != nil || timeEntriesFromDb == nil {
		return nil, err
	}
	// Logging the real ones from the DB to show the pattern of how to use, but sending the mocks ones as a response
	logger.Logger.Info("timeEntriesFromDb", "timeEntriesFromDb len", len(*timeEntriesFromDb))

	timeEntries, err := TimeEntryRepo.GetMock()

	if err != nil || timeEntries == nil {
		return nil, err
	}
	response := server.GetTimeEntriesOKApplicationJSON(*timeEntries)
	return &response, nil
}

func (h *TimeEntryHandler) RemoveTimeEntry(ctx context.Context, params server.RemoveTimeEntryParams) (server.RemoveTimeEntryRes, error) {
	return nil, nil
}

func (h *TimeEntryHandler) UpdateTimeEntry(ctx context.Context, req *server.UpdateTimeEntryRequestBody, params server.UpdateTimeEntryParams) (server.UpdateTimeEntryRes, error) {
	return nil, nil
}

var Handlers = TimeEntryHandler{}
