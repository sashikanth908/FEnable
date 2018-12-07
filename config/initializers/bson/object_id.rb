# frozen_string_literal: true

module BSON
  class ObjectId
    def as_json(*_args)
      to_s
    end
  end
end
