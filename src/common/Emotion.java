package common;

import java.util.Date;

public class Emotion {
	private double init;
	private double fin;
	private double arousal;
	private double valence;
	
	public Emotion() {
		// TODO Auto-generated constructor stub
	}
	
	public Emotion(double arousal, double valence, double t1, double t2) {
		this.arousal = arousal;
		this.valence = valence;
		this.init = t1;
		this.fin = t2;
	}
	
	public double getArousal() {
		return arousal;
	}
	
	public double getFin() {
		return fin;
	}
	
	public double getInit() {
		return init;
	}
	
	public double getValence() {
		return valence;
	}
	
	public void setArousal(double arousal) {
		this.arousal = arousal;
	}
	
	public void setFin(double fin) {
		this.fin = fin;
	}
	
	public void setInit(double init) {
		this.init = init;
	}
	
	public void setValence(double valence) {
		this.valence = valence;
	}
}
