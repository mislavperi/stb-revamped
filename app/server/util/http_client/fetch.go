package httpclient

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

var client = &http.Client{}

func MakeGetRequest(url string, preflight func(req *http.Request)) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("[MakeGetRequest] Failed request")
		return nil, err
	}

	preflight(req)
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Error on GET to url:", url)
		return nil, err
	}

	return resp, nil
}

func MakeStringGetRequest(url string, preflight func(req *http.Request)) (string, error) {
	resp, err := MakeGetRequest(url, preflight)
	if err != nil {
		return "", nil
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error closing body", err)
		}
	}(resp.Body)

	slice, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading resp from byte slice", err)
		return "", nil
	}

	return string(slice), nil
}

func MakePayloadRequest(url string, payload []byte, httpMethod string, preflight func(req *http.Request)) (*http.Response, error) {
	req, err := http.NewRequest(httpMethod, url, bytes.NewBuffer(payload))
	if err != nil {
		fmt.Println("[MakePayloadRequest] Failed to make request")
		return nil, err
	}
	preflight(req)
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("[MakePayloadRequest] Failed to send request")
		return nil, err
	}

	return resp, nil
}

func MakeByteSliceGetRequest(url string, preflight func(req *http.Request)) ([]byte, error) {
	resp, err := MakeGetRequest(url, preflight)
	if err != nil {
		return nil, nil
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			fmt.Println("Error closing body", err)
		}
	}(resp.Body)

	slice, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading resp from byte slice", err)
		return nil, nil
	}

	return slice, nil
}
