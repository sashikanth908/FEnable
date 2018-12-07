# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  include API::Concerns::User
 
  attributes :first_name, :last_name, :middle_name, :check_in, :punch, :office_address, :visit_counts, :visit_comments
  has_one :address, serializer: AddressSerializer
  has_one :company, serializer: CompanySerializer
 
  def visit_counts
    if object.check_ins.present?
      object.check_ins.count
    end
  end
 
  def visit_comments
    if object.check_ins.present?
      object.check_ins.pluck(:comments)
    end
  end
 
  def check_in
    check_in = object.check_ins.where(check_out_datetime: nil).desc(:check_in_datetime).first
    CheckInSerializer.new(check_in, root: false, except: [:user])
  end
 
  def punch
    punch = object.punches.desc(:punch_in_datetime).first
    PunchSerializer.new(punch, root: false, except: [:user])
  end
 
  def office_address
    company = Company.where(id: object.company.id).first
    if company.address.present?
      addr = company.address
      AddressSerializer.new(addr, root: false)
    end
  end
end