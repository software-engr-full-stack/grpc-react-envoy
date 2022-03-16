# https://stackoverflow.com/questions/11958626/make-file-warning-overriding-commands-for-target/49804748
# ifeq here is just saying "is the value empty"
# the value "defined" is just anything that isn't blank
ifeq ($(_COMMON_MAKEFILE_),)
_COMMON_MAKEFILE_ := defined

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
        $(error Undefined '$1'$(if $2, ($2))$(if $(value @), \
                required by target '$@')))
endif
