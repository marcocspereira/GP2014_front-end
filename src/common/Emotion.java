package common;

import java.util.Date;

public class Emotion {
	private Date init;
	private Date fin;
	private Double arousal;
	private Double valence;
	
	public Emotion() {
		// TODO Auto-generated constructor stub
	}
	
	public Emotion(double arousal, double valence, Date t1, Date t2) {
		this.arousal = arousal;
		this.valence = valence;
		this.init = t1;
		this.fin = t2;
	}
	
	public Double getArousal() {
		return arousal;
	}
	
	public Date getFin() {
		return fin;
	}
	
	public Date getInit() {
		return init;
	}
	
	public Double getValence() {
		return valence;
	}
	
	public void setArousal(Double arousal) {
		this.arousal = arousal;
	}
	
	public void setFin(Date fin) {
		this.fin = fin;
	}
	
	public void setInit(Date init) {
		this.init = init;
	}
	
	public void setValence(Double valence) {
		this.valence = valence;
	}
}
