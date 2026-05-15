package core

type BlutvAuthenticationError struct {
	IsBlutvAuthenticationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBlutvAuthenticationError(code string, msg string, ctx *Context) *BlutvAuthenticationError {
	return &BlutvAuthenticationError{
		IsBlutvAuthenticationError: true,
		Sdk:              "BlutvAuthentication",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BlutvAuthenticationError) Error() string {
	return e.Msg
}
