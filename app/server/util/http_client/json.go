package httpclient

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

func MakeJsonGetRequest[T any](url string, preflight func(req *http.Request), stct *T) error {
	resp, err := MakeGetRequest(url, preflight)
	if err != nil {

	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error closing body", err)
		}
	}(resp.Body)

	err = json.NewDecoder(resp.Body).Decode(&stct)
	if err != nil {
		return err
	}

	return nil
}

func MakePayloadJsonRequest[T any](url string, payload []byte, httpMethod string, preflight func(req *http.Request), stct *T) error {
	resp, err := MakePayloadRequest(url, payload, httpMethod, preflight)

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error closing body", err)
		}
	}(resp.Body)

	slice, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading resp from byte slice", err)
	}
	fmt.Println("resp body", string(slice))

	err = json.Unmarshal(slice, &stct)
	if err != nil {
		fmt.Println("Error decoding resp body", err)
		return err
	}

	return nil
}

func ParseJsonByteSlice[T any](byteSlice []byte, scrt *T) error {
	err := json.Unmarshal(byteSlice, scrt)
	if err != nil {
		return errors.New("Failed to parse JSON: " + err.Error())
	}
	return nil
}
