package session

import (
	"context"
	"errors"
	"stb/app/server/internal/server"
	logger "stb/app/server/util/log"
)

type contextKey string

const sessionKey contextKey = "session"

type securityHandler struct{}

var _ server.SecurityHandler = (*securityHandler)(nil)

func (h *securityHandler) HandleBearerAuth(ctx context.Context, operationName server.OperationName, t server.BearerAuth) (context.Context, error) {
	sessionToken := t.Token

	// Verify the session
	// claims, err := jwt.Verify(ctx, &jwt.VerifyParams{
	// 	Token: sessionToken,
	// })
	// if err != nil {
	// 	return nil, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	// }

	usr := &StbUser{
		UserID:    1,
		Email:     "test@test.com",
		FirstName: "Test",
		LastName:  "User",
		Token:     sessionToken,
	}
	// usr, err := clerkuser.Get(ctx, claims.Subject)
	// if err != nil {
	// 	return nil, ogenerrors.ErrSecurityRequirementIsNotSatisfied
	// }

	// Can do RBAC here, using operation name and by getting the session from Redis. Need to rename APIKey to SessionID tho
	ctx = addSessionToContext(ctx, usr)
	return ctx, nil
}

// Mocking the user object to be used in the context
type StbUser struct {
	UserID    int16  `json:"userId"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Token     string `json:"token"`
}

func addSessionToContext(ctx context.Context, session *StbUser) context.Context {
	return context.WithValue(ctx, sessionKey, session)
}

func GetSessionFromContext(ctx context.Context) (*StbUser, error) {
	session, ok := ctx.Value(sessionKey).(*StbUser)
	if !ok || session == nil {
		logger.Logger.Error("Session not found in context")
		return nil, errors.New("session not found in context")
	}
	return session, nil
}

var SecurityHandler = &securityHandler{}
