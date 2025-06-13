package optfield

import (
	"stb/app/server/internal/server"
)

// func NewOptInt16(value int16) server.OptInt16 {
// 	return server.OptInt16{
// 		Value: value,
// 		Set:   value != 0,
// 	}
// }

// func NewOptInt32(value int32) server.OptInt32 {
// 	return server.OptInt32{
// 		Value: value,
// 		Set:   value != 0,
// 	}
// }

// func NewOptFloat32(value float32) server.OptFloat32 {
// 	return server.OptFloat32{
// 		Value: value,
// 		Set:   value != 0,
// 	}
// }

func NewOptString(value string) server.OptString {
	return server.OptString{
		Value: value,
		Set:   value != "",
	}
}
