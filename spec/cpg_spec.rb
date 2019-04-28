# frozen_string_literal: true

RSpec.describe CPG do
  include Rack::Test::Methods

  before do
    @spy_log = StringIO.new
    spy_logger = LogStashLogger.new(type: :io, io: @spy_log)

    mock_app do
      use Rack::Spy do |mw|
        mw.logger = spy_logger
      end
      run CPG::Application.new
    end
  end

  context "with GET /" do
    before { get "/" }

    it do
      expect(last_response.status).to eq(200)
    end

    it do
      expect(last_response.body).to include("CPG-4020")
    end
  end

  context "with GET /login.html" do
    before { get "/login.html" }

    it do
      expect(last_response.status).to eq(200)
    end

    it do
      expect(last_response.body).to include("CPG-4020")
    end
  end

  context "with GET /404" do
    before { get "/404" }

    it do
      expect(last_response.status).to eq(700)
    end

    it do
      expect(last_response.body).to include("login.html")
    end
  end
end
