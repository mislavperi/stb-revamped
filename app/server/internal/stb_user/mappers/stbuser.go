package mappers

import (
	"stb/app/server/internal/server"
	stbuserrw "stb/app/server/internal/stb_user/sql_rw"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func MapStbUserToPgStbUser(uuid uuid.UUID, user server.StbUserUpdateRequestBody) stbuserrw.UpdateStbUserParams {
	var mappedPsqlUser stbuserrw.UpdateStbUserParams

	mappedPsqlUser.StbUserUuid = pgtype.UUID{
		Bytes: uuid,
		Valid: true,
	}

	mappedPsqlUser.StbCustomerID = pgtype.Int2{
		Int16: int16(user.GetStbCustomerId().Value),
		Valid: true,
	}

	mappedPsqlUser.HasStatus = pgtype.Int2{
		Int16: int16(user.GetHasStatus().Value),
		Valid: true,
	}

	mappedPsqlUser.HasAuthMethod = pgtype.Int2{
		Int16: int16(user.GetHasAuthMethod().Value),
		Valid: true,
	}

	mappedPsqlUser.FirstName = pgtype.Text{
		String: user.GetFirstName().Value,
		Valid:  true,
	}

	mappedPsqlUser.MiddleName = pgtype.Text{
		String: user.GetMiddleName().Value,
		Valid:  true,
	}

	mappedPsqlUser.LastName = pgtype.Text{
		String: user.GetLastName().Value,
		Valid:  true,
	}

	mappedPsqlUser.Initials = pgtype.Text{
		String: user.GetInitials().Value,
		Valid:  true,
	}

	return mappedPsqlUser
}
